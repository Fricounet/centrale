import os.path
import sys
import json
import names
import numpy as np
import pandas as pd
from scipy import stats

os.chdir(os.path.dirname(sys.argv[0]))

total = 0
movies = "u.item"
users = "u.user"
ratings = "u.data"
db = "cs-group-12-Baptiste-dynamodb"
data = {db: []}

def check_unique(element, data=data[db]):
    for i in data:
        if i["PutRequest"]["Item"]["uuid"] == element:
            return False
    return True

# function to return key for any value
def get_key(dict, val):
    for key, value in dict.items():
         if val == value:
             return key

    return "key doesn't exist"

# Create movies data
if not os.path.isfile(movies):
    print(f'{movies} does not exist.')
else:
    with open(movies, encoding='iso-8859-1') as f:
        movies_lines = f.read().splitlines()
    movies_id = {}
    waiting_list = []
    for line in movies_lines:
        data_line = {"type": "movie"}
        elements = line.split('|')
        title = elements[1].split('(')[0]
        data_line["title"] = title
        uuid = ''.join(e for e in title if (e.isalnum() or (e == ' ' and e != title[-1])))
        uuid = uuid.lower().replace(" ", "_")
        data_line["uuid"] = uuid
        release_date = elements[2]
        data_line["release date"] = release_date
        unknown = elements[5]
        data_line["unknown"] = unknown
        action = elements[6]
        data_line["action"] = action
        adventure = elements[7]
        data_line["adventure"] = adventure
        animation = elements[8]
        data_line["animation"] = animation
        children = elements[9]
        data_line["children"] = children
        comedy = elements[10]
        data_line["comedy"] = comedy
        crime = elements[11]
        data_line["crime"] = crime
        documentary = elements[12]
        data_line["documentary"] = documentary
        drama = elements[13]
        data_line["drama"] = drama
        fantasy = elements[14]
        data_line["fantasy"] = fantasy
        black_movie = elements[15]
        data_line["black-movie"] = black_movie
        horror = elements[16]
        data_line["horror"] = horror
        musical = elements[17]
        data_line["musical"] = musical
        mystery = elements[18]
        data_line["mystery"] = mystery
        romance = elements[19]
        data_line["romance"] = romance
        sci_fi = elements[20]
        data_line["sci-fi"] = sci_fi
        thriller = elements[21]
        data_line["thriller"] = thriller
        war = elements[22]
        data_line["war"] = war
        western = elements[23]
        data_line["western"] = western

        data_movies = {"PutRequest": {"Item": data_line}}
        if check_unique(uuid, waiting_list):
            waiting_list.append(data_movies)
            movies_id[elements[0]] = uuid
        else:
            print("Doublon")

# Create users data
if not os.path.isfile(users):
    print(f'{users} does not exist.')
else:
    with open(users, encoding='iso-8859-1') as f:
        users_lines = f.read().splitlines()
    users_id = {}
    nb_users = 0
    for line in users_lines:
        data_line = {"type": "user"}
        elements = line.split('|')
        age = elements[1]
        data_line["age"] = age
        gender = elements[2]
        data_line["gender"] = gender
        occupation = elements[3]
        data_line["occupation"] = occupation
        first_name = names.get_first_name(gender='female') if gender == 'F' else names.get_first_name(gender='male')
        data_line["first name"] = first_name
        last_name = names.get_last_name()
        data_line["last name"] = last_name
        uuid = last_name.lower() + "_" + first_name.lower()
        data_line["uuid"] = uuid
        if ' ' in first_name or ' ' in last_name:
            print("alerte !")

        data_users = {"PutRequest": {"Item": data_line}}
        if check_unique(uuid):
            data[db].append(data_users)
            users_id[elements[0]] = uuid
            nb_users += 1
        else:
            print("Doublon")
print(f"Nb d'users {nb_users}")

# Create ratings data
if not os.path.isfile(ratings):
    print(f'{ratings} does not exist.')
else:
    with open(ratings, encoding='iso-8859-1') as f:
       ratings_lines = f.read().splitlines()
    ratings = {}
    nb_ratings = 0
    for line in ratings_lines:
        elements = line.split('\t')
        if (elements[0] in users_id.keys()) and (elements[1] in movies_id.keys()):
            data_line = {"type": "rating"}
            user_id = users_id[elements[0]]
            movie_id = movies_id[elements[1]]
            uuid = movie_id + ":" + user_id
            data_line["uuid"] = uuid
            rating = elements[2]
            data_line["rating"] = rating

            if movie_id in ratings.keys():
                ratings[movie_id].append(rating)
            else:
                ratings[movie_id] = [rating]
            data_ratings = {"PutRequest": {"Item": data_line}}
            data[db].append(data_ratings)
            nb_ratings += 1
print(f"Nb de ratings {nb_ratings}")

# Compute average rating movies
nb_movies = 0
for movie in waiting_list:
    key = movie["PutRequest"]["Item"]["uuid"]
    avg = round(sum([int(rate) for rate in ratings[key]])/len(ratings[key]), 1)
    movie["PutRequest"]["Item"]["AvgRating"] = str(avg)
    data[db].append(movie)
    nb_movies += 1
print(f"Nb de films {nb_movies}")
print(len(data[db]) == nb_movies + nb_users + nb_ratings)


data_cols = ['user_id','item_id','rating','timestamp']
data_bis = pd.read_csv('u.data', sep='\t',names=data_cols, encoding='latin-1')

nb_users = data_bis.user_id.unique().shape[0]
nb_items = data_bis.item_id.unique().shape[0]
ratings = pd.DataFrame(data_bis.groupby('item_id')['rating'].mean())

data_matrix = np.zeros((nb_users, nb_items))
for line in data_bis.itertuples():
    data_matrix[line[1]-1, line[2]-1] = line[3]

user_similarity = np.zeros((nb_users, nb_users))
for i in range(nb_users):
    for j in range(nb_users):
        user_similarity[i][j] = stats.pearsonr(data_matrix[i], data_matrix[j])[0]

def predict(ratings, similarity):
    predictions = similarity.dot(ratings) / np.array([np.abs(similarity).sum(axis=1)]).T

    return predictions

user_prediction = predict(data_matrix, user_similarity)
print(user_prediction)
max = np.amax(user_prediction)
min = np.amin(user_prediction)

for i in range(len(user_prediction)):
    for j in range(len(user_prediction[0])):
        if (str(i + 1) in users_id.keys()) and (str(j + 1) in movies_id.keys()):
            data_line = {"type": "predictedRating"}
            user_id = users_id[str(i + 1)]
            movie_id = movies_id[str(j + 1)]
            uuid = movie_id + ":" + user_id
            data_line["uuid"] = uuid
            rating = round(user_prediction[i][j] + 1, 1)
            if rating > 4:
                print(rating)
            data_line["rating"] = str(rating)

            data_ratings = {"PutRequest": {"Item": data_line}}
            data[db].append(data_ratings)


# Write data to json format
with open('../data.json', 'w') as outfile:
    json.dump(data, outfile, indent=4)
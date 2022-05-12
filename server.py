from flask_cors import CORS
from flask import Flask, render_template, jsonify

import pandas as pd
import numpy as np
from sklearn.decomposition import PCA
from sklearn.manifold import MDS
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

N_COLUMNS = 21


# Get the data from the csv file
def get_data():

    all_dtypes = {
        'Carrier_Code'               :'int64',
        'Origin_Airport'              :'float64',
        'Flight_Season'                :'int64',
        'Flight_Month'                 :'int64',
        'Flight_Week'                  :'int64',
        'Flight_Day'                   :'int64',
        'Scheduled_Departure_Time'     :'int64',
        'Actual_Departure_Time'        :'int64',
        'Departure_Delay'             :'float64',
        'Dep_Temp_3'                  :'float64',
        'Dep_Pressure_3'              :'float64',
        'Dep_Humidity_3'              :'float64',
        'Dep_Wind_Speed_3'             :'float64',
        'Dep_Wind_Deg_3'              :'float64',
        'Dep_Clouds_3'                :'float64',
        'Dep_Rain_3'                  :'float64',
        'Airport_Abbr'                 :'category',
        'Lat_N'                       :'float64',
        'Lng_W'                       :'float64',
        'GMT'                         :'float64',
        'Carrier_Abbr'                 :'category'
    }

    all_cols = [
        'Carrier_Code', 'Origin_Airport', 'Flight_Season', 'Flight_Month',
       'Flight_Week', 'Flight_Day', 'Scheduled_Departure_Time',
       'Actual_Departure_Time', 'Departure_Delay', 'Dep_Temp_3',
       'Dep_Pressure_3', 'Dep_Humidity_3', 'Dep_Wind_Speed_3',
       'Dep_Wind_Deg_3', 'Dep_Clouds_3', 'Dep_Rain_3', 'Airport_Abbr', 'Lat_N',
       'Lng_W', 'GMT', 'Carrier_Abbr'
    ]

    all_df = pd.read_csv("./static/data/stratified_data.csv", dtype=all_dtypes, usecols=all_cols)

    numerical_df = all_df.drop(['Carrier_Abbr', 'Airport_Abbr'], axis=1)


    data = {}

    # data.update(compute_mds(numerical_df))
    data.update(compute_pcp(numerical_df))

    return data


# Compied from lab 2b Task 4 Compute data for MDS plot
def compute_mds(df):
    # # Standarize the dataset
    # mds_df = StandardScaler().fit_transform(df)
    # # Creating MDS
    n_components = 2
    # mds_data = MDS(n_components=n_components)
    # # Fit transform the data
    # mds_points = mds_data.fit_transform(mds_df)
    # # making clusters
    # mds_points_cluster = []
    # labels = df["Carrier_Code"].values
    # unique_labels = np.unique(df['Carrier_Code'])
    
    # for i in unique_labels:
    #     mds_points_cluster.append(mds_points[np.where(labels == i)].tolist())
    
    # # transpose the points to get the domain
    # domain_y = [np.min(mds_points.T[1]), np.max(mds_points.T[1])]
    # domain_x = [np.min(mds_points.T[0]), np.max(mds_points.T[0])]

    # Variables MDS
    variables_mds = MDS(n_components=n_components, dissimilarity="precomputed")
    # (1-|correlation|) distance
    dissimilarity = 1 - np.abs(df.corr())
    # Fit transform data
    variable_mds_points = variables_mds.fit_transform(dissimilarity)
    variable_mds_domain_y = [np.min(variable_mds_points.T[1]), np.max(variable_mds_points.T[1])]
    variable_mds_domain_x = [np.min(variable_mds_points.T[0]), np.max(variable_mds_points.T[0])]
    variables = df.columns.tolist()
    mds_variables = variable_mds_points.tolist()
    return {
        # "mds_data": mds_points_cluster,
        # "mds_data_domain_y": domain_y,
        # "mds_data_domain_x": domain_x, 
        "mds_variables": mds_variables,
        "variables": variables,
        "mds_variable_domain_y": variable_mds_domain_y,
        "mds_variable_domain_x": variable_mds_domain_x
    }

# Copied from task 5 lab2b
def compute_pcp(df):
    # Convert ddf into a 2d matrix
    columns = df.columns
    labels = df["Carrier_Code"].values
    columns = columns.tolist()
    dataset = df.values
    # dataset_trans = np.transpose(dataset)
    
    # Domain for each feature
    domains = dict()
    for i, row in enumerate(np.transpose(dataset)):
        domain = [np.min(row), np.max(row)]
        domains.setdefault(columns[i], domain)
    
    # cluster
    temp_dataset = []
    unique_labels = np.unique(df['Carrier_Code'])
    for i in unique_labels:
        # temp_dataset.append(dataset.loc[dataset["Carrier_Code"] == i])
        temp_dataset.append(dataset[np.where(labels == i)])
        # break
    dataset = temp_dataset

    pcp_dataset = []
    count = 0
    for cluster in dataset:
        point_arr = []
        print("Converting cluster", count, "for PCP")
        # for each row in a cluster, convert it into a dictionary
        for row in cluster:
            point = dict()
            for index, p in enumerate(row):
                point.setdefault(columns[index], p)
            point_arr.append(point)
        count += 1
        # pcp_dataset.append(point_arr)
        pcp_dataset.extend(point_arr)

    
    return {
        "pcp_dataset": pcp_dataset, 
        "pcp_dataset_domains": domains
    }


# initial flask
app = Flask(__name__)
CORS(app)

# https://flask.palletsprojects.com/en/2.0.x/api/#flask.render_template
@app.route("/")
@app.route("/homepage")
def render_home_page():
    # print("Rendering home page...)
    return render_template('index.html')


@app.route("/project", methods=['POST'])
def render_data():
    return jsonify(get_data())


if __name__ == '__main__':
    app.run(debug=True, port=8080)

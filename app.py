import pandas as pd
import numpy as np
from datetime import datetime, timedelta

from IPython.core.display import display, HTML
display(HTML("<style>.container { width:100% !important; }</style>"))

#2021 import
daily_production_df = pd.read_csv('data.csv', index_col='Unnamed: 0')

#Chane Date column type to datetype (When in was inported, it was an obj)
daily_production_df.Date = pd.to_datetime(daily_production_df.Date) #changes Date to DateTime type from Object(string) type
#df.Date = pd.to_datetime(df.Date) # TO DO: CHECK DOCUMENTATION FOR THIS

#removing NaNs
daily_production_df['Remarks'] = daily_production_df['Remarks'].fillna('') #Used this method to only execute on Remarks column,
#so DateTime and float64 types wouldn't be converted to Object types


#Formating floats to show zero decimals
pd.options.display.float_format = '{:,.0f}'.format

#daily_production_df

#2021 dates
import datetime
end = datetime.date.today() #THIS FORMAT WORKS
#end = datetime.datetime(2021, 2, 1).date()
start = daily_production_df.iloc[0]['Date'].date() # Gets the most recent date from the dataframe

numdays = (end-start).days # Calculates the number of days between the above two dates

date_list = [end - timedelta(days=x) for x in range(numdays)]

import_2021_df = pd.DataFrame()

for i in range(numdays):
    try:
        path2021 = 'G:\CML Operations\WELL FILES\A     NON-OPERATED - SOLD\HAWKWOOD\Daily production starting 5-17-2018\\2021\DailyProductionReport-' + str(date_list[i]) + '.xlsx'
        import_2021 = pd.read_excel(path2021)
        import_2021['Remarks'] = import_2021['Remarks'].fillna('')
        import_2021.dropna(axis=0, how='any', inplace=True)
        

        
        #import_2021_df = pd.concat([import_2021_df, import_2021]).drop_duplicates()
        import_2021_df = pd.concat([import_2021_df,import_2021]).drop_duplicates()
    except:
        print('The production for ' + str(date_list[i]) + ' is not available.')
        continue

try:
    import_2021_df.Date = pd.to_datetime(import_2021_df.Date)
    import_2021_df['Date'] = pd.to_datetime(import_2021_df["Date"].dt.strftime('%Y-%m-%d'))
    import_2021_df.to_csv('plot.csv')
except AttributeError:
    print("Cannot create dataframe for " + str(date_list[i]) + " production")

#import_2021_df

import_2021_df.to_csv('plot.csv') #SAVE DAILY NUMBERS TO MACRO THEM TO DESIGNATED TABS IN THE Daily Production by well.xlsx

#saving 2021 production to csv
daily_production_df.to_csv('data.csv')

daily_production_df.to_csv('T:\Geotech-Documents\Hawkwood_Production_Autonomation\data.csv')

# Create wellname and date widgets to sort dataframe
well_list = daily_production_df['Site_Name'].to_dict()

import pandas as pd
from flask import Flask
app = Flask(__name__)

@app.route("/")
def welcome():
    return well_list

@app.route("/<wellname>")
def well(wellname):
    df_query = daily_production_df[(daily_production_df[wellname]) &
            (daily_production_df['Oil_(BBL)'] > 0) & 
            (daily_production_df['Gas_(MCF)'] > 0) & 
            (daily_production_df['Water_(BBL)'] > 0)]
    return df_query.to_dict()
    
    # Get cum for entire well life regardless of days !!selected. That way cum oil is always correct
   # df_cum = daily_production_df[daily_production_df['Site_Name'] == wellname]
    #cumoil = int(df_cum['Oil_(BBL)'].sum())
    #cumgas = int(df_cum['Gas_(MCF)'].sum())
    #print(f'{wellname} has produced {cumoil} BBLS of oil')
    #print(f'{wellname} has produced {cumgas} MCF of gas')

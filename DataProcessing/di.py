#IMPORT DEPENDENCIES
import pandas as pd
from datetime import datetime, timedelta
#2021 import
daily_production_df = pd.read_csv('data.csv', index_col='Unnamed: 0')
#Change Date column type to datetype (When in was inported, it was an obj)
daily_production_df.Date = pd.to_datetime(daily_production_df.Date) #changes Date to DateTime type from Object(string) type
#remove NaNs
daily_production_df['Remarks'] = daily_production_df['Remarks'].fillna('') #Used this method to only execute on Remarks column,
daily_production_df['Hrs_On'] = daily_production_df['Hrs_On'].fillna('')
daily_production_df['Tubing_(PSI)'] = daily_production_df['Tubing_(PSI)'].fillna('')
daily_production_df['Casing_(PSI'] = daily_production_df['Casing_(PSI'].fillna('')
#Format floats to show zero decimals
pd.options.display.float_format = '{:,.0f}'.format
#print(daily_production_df)

#2021 dates
import datetime
end = datetime.date.today() #THIS FORMAT WORKS
#end = datetime.datetime(2021, 2, 1).date()
start = daily_production_df.iloc[0]['Date'].date() # Gets the most recent date from the dataframe
numdays = (end-start).days # Calculates the number of days between the above two dates
date_list = [end - timedelta(days=x) for x in range(numdays)]
import_2021_df = pd.DataFrame()

#LOOP FOR HOWEVER MANY DAYS THERE IS NO PRODUCTION AND IMPORT THE NEWEST PRODUCTION AVAILABLE
for i in range(numdays):
    try:
        path2021 = 'G:\CML Operations\WELL FILES\A     NON-OPERATED - SOLD\HAWKWOOD\Daily production starting 5-17-2018\\2021\DailyProductionReport-' + str(date_list[i]) + '.xlsx'
        import_2021 = pd.read_excel(path2021)
        import_2021['Remarks'] = import_2021['Remarks'].fillna('')
        import_2021['Hrs_On'] = import_2021['Hrs_On'].fillna('')
        import_2021['Tubing_(PSI)'] = import_2021['Tubing_(PSI)'].fillna('')
        import_2021['Casing_(PSI'] = import_2021['Casing_(PSI'].fillna('')
        import_2021.dropna(axis=0, how='any', inplace=True)
        import_2021_df = pd.concat([import_2021_df,import_2021]).drop_duplicates()
    except:
        print('The production for ' + str(date_list[i]) + ' is not available.')
        continue

#TRY TO SAVE THE LATEST IMPORT TO plot.csv WHICH IS USED TO ADD INDIVIDUAL PRODUCTION DATA (EACH WELL HAS A SHEET IN THE WORKBOOK "Daily Production by well")
try:
    import_2021_df.Date = pd.to_datetime(import_2021_df.Date)
    import_2021_df['Date'] = pd.to_datetime(import_2021_df["Date"].dt.strftime('%Y-%m-%d'))
    import_2021_df.to_csv('plot.csv')
except AttributeError:
    print("Cannot create dataframe for " + str(date_list[i]) + " production")
#print(import_2021_df)

# concatenate 2021 import to daily production df (2018, 2019, &2020)
daily_production_df = pd.concat([daily_production_df, import_2021_df]).drop_duplicates()
#sort data by name_site ascending, keeping most recent date at ['Date'][0] so it can be refernced in the following yearts date list
daily_production_df = daily_production_df.sort_values(['Date', 'Site_Name'], ascending = [False , True]) 

#print(daily_production_df)

#save all original 2021 production to csv
#CSV SAVED WITHOUT CHANING ANY < 1 TO 0.01
daily_production_df.to_csv('G:\CML Operations\WELL FILES\A     NON-OPERATED - SOLD\HAWKWOOD\Daily production starting 5-17-2018\Backups\data_original.csv')

daily_production_df_JSON = daily_production_df
# REPLACE ALL VALUES <1 TO 0.01
daily_production_df_JSON.loc[(daily_production_df_JSON['Gas_(MCF)'] < 1), ['Gas_(MCF)']] = [0.01]
daily_production_df_JSON.loc[(daily_production_df_JSON['Water_(BBL)'] < 1), ['Water_(BBL)']] = [0.01]
daily_production_df_JSON.loc[(daily_production_df_JSON['Oil_(BBL)'] < 1), ['Oil_(BBL)']] = [0.01]

daily_production_df.to_csv('data.csv') #CSV SAVED WITH ALL < 1 REPLACED TO 0.01

#print(daily_production_df_JSON)
# CHANGE DATETIME TYPE TO OBJECT
daily_production_df_JSON['Date'] = daily_production_df_JSON['Date'].dt.strftime('%Y-%m-%d')
daily_production_df_JSON.to_json("C:/Users/avalosg/OneDrive - CML Exploration/Desktop/HAWKWOOD/static/all_production.json", orient='values', date_format='iso')
# CREATE DF SPECIFIC TO JSON FORMAT MAKE EVERYTHING LESS THAN 1 = .01
import_2021_df_JSON = import_2021_df
#print(import_2021_df_JSON)
# CHANGE DATETIME TYPE TO OBJECT
try:
    import_2021_df_JSON['Date'] = import_2021_df_JSON['Date'].dt.strftime('%Y-%m-%d')
    print("new data processed, push changes in DB\HAWKWOOD repo")
except: 
    print("no new data to import")

import_2021_df_JSON.to_json("C:/Users/avalosg/OneDrive - CML Exploration/Desktop/HAWKWOOD/static/todaysImport.json", orient='values', date_format='iso')


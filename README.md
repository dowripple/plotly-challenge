# plotly-challenge
## by Michael Dowlin
## 2/01/20

!['Bubble Image not available'](/static/images/bubble_chart.png)
!['Bar Image not available'](/static/images/top_sample_bar.png)
!['Gauge Image not available'](/static/images/gauge.png)

### Description
This assignment explores the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.  The data was provided as a json file (samples.json), along with a started html page.  For the assignment, I only modified the javascript file 'app.js'.   

The 'app.js' program starts by declaring a variable for the drop down list of test subjects.  The json file is read, D3, and options are added for every id in the dataset.  This first d3.json call is only ran once.  (There is a function call to "optionChannged" at the end).  The next step is the function "optionChanged", which parses the json file again but this time filters the dataset for the passed in test_id.  All of the charting is done inside this function!  Since the function was called on the first read, the screen will be initialized witht the first subject's data (#940).

### Link to Site
[Belly Button Biodiversity Data Dashboard](https://dowripple.github.io/plotly-challenge/)

### Contents
| File                         | Description                                                                                     |
|------------------------------|-------------------------------------------------------------------------------------------------|
|index.html                    |html page for assignment, note that no HTML code was changed                                     |
|samples.json                  |The data provided for the assignment.  The Json contains information about test subjects's belly button fauna, and includes other metadata, like belly button washing frequency       |
|static\js\app.js              |Application for assignment.  This script parses the belly button datasets and manipulates the HTMl of the index.html page.  Changes include: adding 1 bar chart, adding 1 bubble chart, adding 1 gauge and a table of metadata.  |

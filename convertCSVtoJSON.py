import pandas as pd
import os

file = os.path.join("resources", "belly_button_2_meta.csv")

file_df = pd.read_csv(file, encoding="ISO-8859-1")

output_file = os.path.join("meta.json")

file_df.to_json(output_file)
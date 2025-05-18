import re
import json
import os
import streamlit as st

def generate_rule(name, epl_text, action_type, email_params=None, post_params=None):
   
    if action_type == "e-mail":
        action = {
            "type": action_type,
            "parameters": email_params
        }
    elif action_type == "post":
        # Verifica se post_params está presente e usa seus valores
        action = {
            "type": action_type,
            "parameters": post_params if post_params else {}
        }
   
    rule = {
        "name": name,
        "text": epl_text,
        "action": action
    }
    
    return rule

def validate_email(email):
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_regex, email)

def validate_url(url):
    url_regex = r'^(http://|https://)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(/[\w.-]*)*(\?[;&a-zA-Z0-9_=-]*)?(\#[\w.-]*)?$'
    return re.match(url_regex, url)

def display_error_message(message):
    st.markdown(f"<p style='color:red;'>{message}</p>", unsafe_allow_html=True)

def load_saved_flow():
    saved_flows = []
    if os.path.exists("saved_flows"):
        saved_flows = os.listdir("saved_flows")
    return saved_flows

def save_flow(flow_data, filename):
    if not os.path.exists("saved_flows"):
        os.makedirs("saved_flows")
    with open(f"saved_flows/{filename}.json", "w") as f:
        json.dump(flow_data, f, indent=4)

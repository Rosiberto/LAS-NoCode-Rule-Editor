import streamlit as st
import json
from blocks.action_block import action_block
from blocks.rule_block import rule_block
from blocks.epl_block import epl_block
from blocks.email_block import email_block
from blocks.post_block import post_block
from blocks.select_block import select_block
from blocks.select_where_block import select_where_block
from blocks.select_length_block import select_length_block
from blocks.select_time_block import select_time_block
from blocks.aggregation_count_block import  aggregation_count_block
from blocks.aggregation_sum_block import  aggregation_sum_block
from blocks.aggregation_avg_block import  aggregation_avg_block
from blocks.aggregation_min_block import  aggregation_min_block
from blocks.aggregation_max_block import  aggregation_max_block
from utils.utils import generate_rule, validate_email, validate_url, display_error_message, load_saved_flow, save_flow
from barfi.flow.streamlit import st_flow


def create_blocks():
    print("oi")



def main():
    create_blocks()

if __name__ == "__main__":
    main()
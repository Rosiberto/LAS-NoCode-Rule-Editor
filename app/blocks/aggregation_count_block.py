from barfi.flow.block import Block

aggregation_count_block = Block(name="COUNT")
aggregation_count_block.add_option(name='aggregation_count_display', type='display', value='SELECT count(*) FROM ')
aggregation_count_block.add_option(name='aggregation_count_epl', type='input', value='event')
aggregation_count_block.add_output(name='out_select')

def create_aggregation_count_block(self):
    display = self.get_option(name='aggregation_count_display')        
    epl = self.get_option(name='aggregation_count_epl')  # Captura o texto EPL
   
    full_query = display + epl  

    self.set_interface(name='out_select', value=full_query)  # Passa o texto EPL como saída

# Associar a função de computação ao bloco
aggregation_count_block.add_compute(create_aggregation_count_block)
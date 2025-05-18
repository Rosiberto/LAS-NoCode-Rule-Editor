from barfi.flow.block import Block

aggregation_min_block = Block(name="MIN")
aggregation_min_block.add_option(name='aggregation_min_display', type='display', value='SELECT min')
aggregation_min_block.add_option(name='aggregation_min_value', type='input', value='min_value')  # Input para o campo que será somado
aggregation_min_block.add_option(name='aggregation_from_display', type='display', value='FROM')
aggregation_min_block.add_option(name='aggregation_from_value', type='input', value='event')  # Input para a tabela de onde os dados virão
aggregation_min_block.add_output(name='out_select')


def create_aggregation_min_block(self):
    display = self.get_option(name='aggregation_min_display')        
    value = self.get_option(name='aggregation_min_value')  # Captura o texto EPL
    _from = self.get_option(name='aggregation_from_value')
    
    full_query = display + "(" + value + ")" + _from  

    self.set_interface(name='out_select', value=full_query)

# Associar a função de computação ao bloco
aggregation_min_block.add_compute(create_aggregation_min_block)
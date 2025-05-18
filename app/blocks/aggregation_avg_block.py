from barfi.flow.block import Block

aggregation_avg_block = Block(name="AVG")
aggregation_avg_block.add_option(name='aggregation_avg_display', type='display', value='SELECT avg')
aggregation_avg_block.add_option(name='aggregation_avg_value', type='input', value='avg_value')  # Input para o campo que será somado
aggregation_avg_block.add_option(name='aggregation_from_display', type='display', value='FROM')
aggregation_avg_block.add_option(name='aggregation_from_value', type='input', value='event')  # Input para a tabela de onde os dados virão
aggregation_avg_block.add_output(name='out_select')


def create_aggregation_avg_block(self):
    display = self.get_option(name='aggregation_avg_display')        
    value = self.get_option(name='aggregation_avg_value')  # Captura o texto EPL
    _from = self.get_option(name='aggregation_from_value')
    
    full_query = display + "(" + value + ")" + _from  

    self.set_interface(name='out_select', value=full_query)

# Associar a função de computação ao bloco
aggregation_avg_block.add_compute(create_aggregation_avg_block)
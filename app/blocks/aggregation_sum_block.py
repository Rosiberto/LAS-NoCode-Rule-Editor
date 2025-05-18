from barfi.flow.block import Block

aggregation_sum_block = Block(name="SUM")
aggregation_sum_block.add_option(name='aggregation_sum_display', type='display', value='SELECT sum')
aggregation_sum_block.add_option(name='aggregation_sum_value', type='input', value='sum_value')  # Input para o campo que será somado
aggregation_sum_block.add_option(name='aggregation_from_display', type='display', value='FROM')
aggregation_sum_block.add_option(name='aggregation_from_value', type='input', value='event')  # Input para a tabela de onde os dados virão
aggregation_sum_block.add_output(name='out_select')


def create_aggregation_sum_block(self):
    display = self.get_option(name='aggregation_sum_display')        
    value = self.get_option(name='aggregation_sum_value')  # Captura o texto EPL
    _from = self.get_option(name='aggregation_from_value')
    
    full_query = display + "(" + value + ")" + _from  

    self.set_interface(name='out_select', value=full_query)  # Passa o texto EPL como saída

# Associar a função de computação ao bloco
aggregation_sum_block.add_compute(create_aggregation_sum_block)
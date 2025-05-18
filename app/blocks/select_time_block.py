from barfi.flow.block import Block

select_time_block = Block(name="Time")
select_time_block.add_option(name='select_from_display', type='display', value='SELECT * FROM ')
select_time_block.add_option(name='select_from_value', type='input', value='event')
select_time_block.add_option(name='select_time_display', type='display', value='#time')
select_time_block.add_option(name='select_time_value', type='input', value='Enter the time')

select_time_block.add_output(name='out_select')

def create_select_time_block(self):
    select_from_display   = self.get_option(name='select_from_display') 
    select_from_value     = self.get_option(name='select_from_value')  # Captura o texto EPL
    select_time_display = self.get_option(name='select_time_display') 
    select_time_value   = self.get_option(name='select_time_value')

    full_query = select_from_display + select_from_value + select_time_display + "(" + select_time_value + ")"

    self.set_interface(name='out_select', value=full_query)  # Passa o texto EPL como saída

# Associar a função de computação ao bloco
select_time_block.add_compute(create_select_time_block)
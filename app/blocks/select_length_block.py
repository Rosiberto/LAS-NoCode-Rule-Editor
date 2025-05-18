from barfi.flow.block import Block

select_length_block = Block(name="Length")
select_length_block.add_option(name='select_from_display', type='display', value='SELECT * FROM ')
select_length_block.add_option(name='select_from_value', type='input', value='event')
select_length_block.add_option(name='select_length_display', type='display', value='#length')
select_length_block.add_option(name='select_length_value', type='input', value='Enter the length')

select_length_block.add_output(name='out_select')

def create_select_length_block(self):
    select_from_display   = self.get_option(name='select_from_display') 
    select_from_value     = self.get_option(name='select_from_value')  # Captura o texto EPL
    select_length_display = self.get_option(name='select_length_display') 
    select_length_value   = self.get_option(name='select_length_value')

    full_query = select_from_display + select_from_value + select_length_display + "(" + select_length_value +")"

    self.set_interface(name='out_select', value=full_query)  # Passa o texto EPL como saída

# Associar a função de computação ao bloco
select_length_block.add_compute(create_select_length_block)
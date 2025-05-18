from barfi.flow.block import Block

select_where_block = Block(name="Select Where")
select_where_block.add_option(name='select_from_display', type='display', value='SELECT * FROM ')
select_where_block.add_option(name='select_from_value', type='input', value='event')
select_where_block.add_option(name='select_where_display', type='display', value=' WHERE ')
select_where_block.add_option(name='select_where_value', type='input', value='Enter the condition')

select_where_block.add_output(name='out_select')

def create_select_where_block(self):
    select_from_display  = self.get_option(name='select_from_display') 
    select_from_value    = self.get_option(name='select_from_value')  # Captura o texto EPL
    select_where_display = self.get_option(name='select_where_display') 
    select_where_value   = self.get_option(name='select_where_value')

    full_query = select_from_display + select_from_value + select_where_display + select_where_value

    self.set_interface(name='out_select', value=full_query)  # Passa o texto EPL como saída

# Associar a função de computação ao bloco
select_where_block.add_compute(create_select_where_block)
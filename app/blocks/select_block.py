from barfi.flow.block import Block

select_block = Block(name="Select")
select_block.add_option(name='select_from_display', type='display', value='SELECT * FROM ')
select_block.add_option(name='select_from_display_value', type='input', value='event')
select_block.add_output(name='out_select')

def create_select_block(self):
    display = self.get_option(name='select_from_display') 
    epl_text = self.get_option(name='select_from_display_value')  # Captura o texto EPL
           

    full_query = display + epl_text  

    self.set_interface(name='out_select', value=full_query)  # Passa o texto EPL como saída

# Associar a função de computação ao bloco
select_block.add_compute(create_select_block)
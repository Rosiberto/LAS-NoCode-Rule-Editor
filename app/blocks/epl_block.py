from barfi.flow.block import Block

epl_block = Block(name="EPL")
epl_block.add_option(name='epl_display', type='input', value='Enter the EPL statement.')
epl_block.add_output(name='out_select')

def create_epl_block(self):
    display = self.get_option(name='epl_display')  # Captura o texto EPL
    self.set_interface(name='out_select', value=display)  # Passa o texto EPL como saída

# Associar a função de computação ao bloco
epl_block.add_compute(create_epl_block)
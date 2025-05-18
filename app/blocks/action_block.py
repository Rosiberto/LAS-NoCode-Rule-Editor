from barfi.flow.block import Block

action_block = Block(name="Action Type")
action_block.add_option(name='select-type', type='select', items=['e-mail', 'post'], value='e-mail')
action_block.add_input(name='in_act_type')
action_block.add_output(name='out_action')

def create_action_block(self):
    
    action_type = self.get_option(name='select-type')  # Captura o valor selecionado
    self.set_interface(name='out_action', value=action_type)  # Passa o tipo de ação como saída


# Add the compute function to the block
action_block.add_compute(create_action_block)

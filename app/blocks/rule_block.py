from barfi.flow.block import Block

rule_block = Block(name="Rule")
rule_block.add_option(name='name_rule', type='input', value='Enter the name of the rule.')

rule_block.add_input(name='in_select')
rule_block.add_input(name='in_action')

rule_block.add_output(name="out_rule")


def create_rule_block(self):

    name_rule   = self.get_option(name='name_rule')
    text_epl    = self.get_interface(name='text_epl')
    action_type = self.get_interface(name='action_type')

    # Gerar e passar adiante os dados computados
    self.set_interface(name='out_rule', value={
        'name': name_rule,
        'text': text_epl,
        'action_type': action_type
    })

# Associar a função de computação ao bloco
rule_block.add_compute(create_rule_block)
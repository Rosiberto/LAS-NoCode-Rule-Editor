from barfi.flow.block import Block
from utils.utils import validate_url

post_block = Block(name="POST")
post_block.add_option(name='url', type='input', value='')
post_block.add_output(name='out_to_act_type')

def create_post_block(self):

    url = self.get_option(name='url')  # Captura a URL inserida

    if not validate_url(url):
        self.set_interface(name='out_to_act_type', value=None)
        return

    post_data = {
        "url": url
    }

    self.set_interface(name='out_to_act_type', value=post_data)  # Passa a URL como saída


# Associar a função de computação ao bloco
post_block.add_compute(create_post_block)

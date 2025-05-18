from barfi.flow.block import Block


email_block = Block(name="E-mail")
email_block.add_option(name='from', type='input', value='FROM@from.com')
email_block.add_option(name='to', type='input', value='TO@to.com')
email_block.add_option(name='subject', type='input', value='Subject')
email_block.add_option(name='body', type='input', value='Body')
email_block.add_output(name='out_to_act_type')


def create_email_block(self):
    from_email = self.get_option(name='from')  # Captura o e-mail de "de"
    to_email   = self.get_option(name='to')  # Captura o e-mail de "para"
    subject    = self.get_option(name='subject')  # Captura o assunto
    body       = self.get_option(name='body')  # Captura o corpo do e-mail

    # Monta o dicionário com os dados do e-mail
    email_data = {
        "from": from_email,
        "to": to_email, 
        "subject": subject,
        "body": body
    }

    self.set_interface(name='out_to_act_type', value=email_data)  # Passa o dicionário de dados do e-mail como saída



 # Associar a função de computação ao bloco
email_block.add_compute(create_email_block)
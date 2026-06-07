
import secrets
import string

def shorten():
    chars = string.ascii_letters + string.digits

    code = ''.join(
        secrets.choice(chars)
        for _ in range(6)
    )

    return code


import queue
from random import randint


palpites = queue.Queue()
sorteado = randint(1, 101)
print(sorteado)

palpite = int(input("Chute um numero: "))

while (palpite != sorteado):
        palpites.put(palpite)


        return_ = ""
        for item in list(palpites.queue):
            return_ += f"{item} "
        print(return_)

        palpite = int(input("Chute um numero: "))





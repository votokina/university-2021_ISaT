import telebot
from telebot import types

TOKEN = 'TOKEN'

OPTIONS = {
    "СГН3-61Б": 0,
    "СГН3-62Б": 0,
    "СГН3-63Б": 0,
    "СГН3-64Б": 0,
    "Очистить всё": 0,
}


bot = telebot.TeleBot(TOKEN)

@bot.message_handler(commands=['start'])
def start(message):
    sendDefaultKeyBoard(message.chat.id)

@bot.callback_query_handler(func=lambda message: message.data)
def button(message):
    if message.data in OPTIONS:
        OPTIONS[message.data] += 1
        sendKeyBoard(message.message.chat.id, message.data + "\n" + "На эту кнопку нажали " + str(OPTIONS[message.data]) + " раз(а).", OPTIONS.keys())
    
    if message.data == "Очистить всё":
        i = 0
     
        text = ""
        for key in OPTIONS.keys():
            if key != "Очистить всё":
                text += "\n" + key + ": " + str(OPTIONS.get(key))
        bot.send_message(message.message.chat.id, "Итог голосования: \n" + text)
        
        while i < 5:
            OPTIONS[i] = 0
            i+=1
        bot.send_message(message.message.chat.id, "Голосование обнулено.")


def sendKeyBoard(chatId, message, buttons):
    keyboard = types.InlineKeyboardMarkup()

    for button in buttons:
        keyboard.row(types.InlineKeyboardButton(text = button, callback_data= button))

    bot.send_message(chatId, message, reply_markup=keyboard)

def sendDefaultKeyBoard(chatId):
    sendKeyBoard(chatId, "Проголосуй", OPTIONS.keys())

bot.polling(none_stop=True)
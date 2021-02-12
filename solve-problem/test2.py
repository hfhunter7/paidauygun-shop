cash = [1,5,10,20,100]
money = int(input('input money = '))

onebill = money // 100
money = money % 100

twentybill = money // 20
money = money % 20

tencoin = money // 10
money = money % 10

fivecoin = money // 5
money = money % 5

onecoin = money // 1
money = money % 1

print("แบงค์ 100", onebill)
print("แบงค์ 20", twentybill)
print("เหรียญ 10", tencoin)
print("เหรียญ 5", fivecoin)
print("เหรียญ 1", onecoin)

count = onebill + twentybill + tencoin + fivecoin + onecoin
print("จำนวนธนบัตรที่น้อยที่สุด", count)
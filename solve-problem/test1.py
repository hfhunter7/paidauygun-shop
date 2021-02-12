input1 = int(input('input N = '))
input2 = input('input character color = ')
print('input1 = ', input1)
print('input2 = ', input2)

count = 0
if len(input2) <= input1:
    for i in range(len(input2)):
        if (i + 1) < len(input2):
            if input2[i] == input2[i + 1]:
                count += 1

    print("จำนวนสี่เดียวกันและอยู่ติดกัน", count)
else:
    print('ไม่สามารถใส่เกินจำนวนก้อนหินได้')
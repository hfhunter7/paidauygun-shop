n = int(input("input length = "))
A = int(input("input A = "))
B = int(input("input B = "))
C = int(input("input C = "))

arr = [A, B, C]
arr = list(dict.fromkeys(arr))

count = 0

if n >= 1:
    for i in range(len(arr)):
        if arr[i] <= 4000:
            if arr[i] < n:
                count+=1
        else:
            print("ค่า" + str(arr[i]) + " มีค่าได้ไม่เกิน 4000")
else:
    print("N ต้องมีค่ามากกว่า 1")

print("จำนวนท่อนไม้ทั้งหมดที่ตัดได้", count)
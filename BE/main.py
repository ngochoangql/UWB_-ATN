import requests
import csv

# URL của API bạn muốn đọc
api_url = "http://localhost:5000/localizations/location"

try:
    # Gửi yêu cầu GET đến API
    response = requests.get(api_url)
    
    # Kiểm tra xem yêu cầu có thành công không (status code 200)
    if response.status_code == 200:
        # Chuyển dữ liệu JSON từ API thành danh sách (list) các đối tượng dict
        data = response.json()
        
        # Xác định tên tệp CSV bạn muốn tạo
        csv_file = "709h6_2_2.csv"
        
        # Mở tệp CSV để ghi
        with open(csv_file, "w", newline="") as csvfile:
            # Xác định các trường dữ liệu cho tiêu đề (header) của tệp CSV
            fieldnames = ["_id","time","x", "y", "z","__v"]
            
            # Tạo đối tượng ghi CSV
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            # Viết tiêu đề vào tệp CSV
            writer.writeheader()
            
            # Ghi dữ liệu từ danh sách data vào tệp CSV
            for item in data:
                writer.writerow(item)
        
        print(f"Dữ liệu đã được ghi vào {csv_file}")
    else:
        print("Yêu cầu không thành công. Status code:", response.status_code)

except Exception as e:
    print("Có lỗi xảy ra:", str(e))

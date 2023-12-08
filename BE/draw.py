import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Đọc dữ liệu từ tệp CSV và chỉ lấy hai cột x và y
data = pd.read_csv('data.csv', usecols=['x', 'y'])

# Lấy tọa độ x và y từ dữ liệu
x = data['x']
y = data['y']

# Đặt gốc tọa độ và mở rộng trục x và y
plt.xlim(0, 2)  # Mở rộng trục x từ 0 đến 2 mét
plt.ylim(5.385, 7.59)  # Mở rộng trục y từ 5.85 đến 7.85 mét

# Vẽ scatter plot cho dữ liệu gốc
plt.scatter(x, y, label='Dữ liệu')

# Tạo dãy giá trị y cho các điểm màu cam
orange_y = np.linspace(5.385, 7.59, num=11)  # 11 điểm từ 5.385 đến 7.59

# Tạo mảng x chứa giá trị 0.6 để tạo các điểm với x = 0.6
orange_x = np.full_like(orange_y, 0.6)

# Vẽ các điểm màu cam
plt.scatter(orange_x, orange_y, c='orange', label='Điểm màu cam')

# Đặt tên cho trục x và y
plt.xlabel('Trục X')
plt.ylabel('Trục Y')

# Đặt tiêu đề cho biểu đồ
plt.title('Biểu đồ Scatter Plot từ CSV với Gốc Tọa Độ (0, 5.85) và Mở Rộng 2 mét')

# Hiển thị chú thích (nếu cần)
plt.legend()

# Hiển thị biểu đồ
plt.show()

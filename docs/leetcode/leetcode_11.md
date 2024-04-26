
# Leetcode-11. Container With Most Water
## 題目說明
給定一個長度為 `n` 的整數數組。繪製 `n` 條垂直線，第 `i` 條線的兩個端點為 `(i, 0)` 和 `(i, height[i])`。

求與 `x` 軸一起形成容器的兩條線，使得該容器包含最多的水。

返回容器可以儲存的最大水量。

請注意，您不能傾斜容器。
### 限制條件：
- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`
## 解題思路

首先宣告兩個指標分別為left和right，分別記錄最左邊和最右邊的容器長度並計算當前最大容量與下一個容量做比較看哪一個比較大，最後直到left大於right就結束。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int maxArea(vector<int>& height) {
        int maxvalue = 0;
        int left = 0;
        int right = height.size() - 1;
        while (left < right) {
            maxvalue = max(maxvalue, (right - left) * min(height[left], height[right]));
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxvalue;
    }
};
```
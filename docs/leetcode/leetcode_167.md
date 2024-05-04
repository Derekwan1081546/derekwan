
# Leetcode-167. Two Sum II - Input Array Is Sorted
## 題目說明
給定一個已按非遞減順序排序的 1 索引整數數組，找到兩個數字，使它們加起來等於特定的目標數字。 令這兩個數字為`numbers[index1]`和`numbers[index2]`，其中`1 <=index1<index2<=numbers.length`。

傳回兩個數字`index1`和`index2`的索引，將其加一作為長度為2的整數數組`[index1,index2]`。

測試的產生使得只有一個解。 您不能兩次使用相同的元素。

您的解決方案必須僅使用恆定的額外空間。
### 限制條件：
- `2 <=  numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- 數字按非降序排列。
- `-1000 <= target  <= 1000`
- 測試的產生使得只有一個解。

## 解題思路
初始化兩個指標`i`和`j`，分別指向數組的開頭和結尾。
使用 `while` 迴圈進行迭代，直到`j`小於`i`。
計算位置`i`和`j`處的數字總和。
如果總和大於目標，則減少`j`。
如果總和小於目標，則增加`i`。
如果總和等於目標，則傳回索引 `[i+1, j+1]`，因為索引是從 1 開始的。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        vector<int> arr;
        int i = 0;
        int j = numbers.size() - 1;
        while (i < j) {
            if (numbers[i] + numbers[j] > target) {
                j--;
            } else if (numbers[i] + numbers[j] < target) {
                i++;
            } else {
                arr.push_back(i + 1);
                arr.push_back(j + 1);
                return arr;
            }
        }
        return arr;
    }
};
```
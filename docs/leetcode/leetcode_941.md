
# Leetcode-941. Valid Mountain Array
## 題目說明
給定一個整數數組 `arr`，當且僅當它是有效的 `Mountain Array` 時傳回 `true`。

回傳 `arr` 是一個 `Mountain Array` 若且為若：
- `arr.length >= 3`
存在一些 0 < i < arr.length - 1 的 i ，如下：
- `arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
- `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`
### 限制條件：
- `1 <= arr.length <= 10^4`
- `0 <= arr[i] <= 10^4`
## 解題思路
- `n` 表示數組的長度。
- `i` 是一個用來遍歷數組的指標，最初設置為 `0`（數組的開頭）。
- 首先通過遞增迴圈找到數組的峰頂，接著再通過遞減迴圈檢查峰頂後是否有遞減的元素。若數組符合「先嚴格遞增後嚴格遞減」的規則，並且峰頂不在數組的開頭或結尾，則返回 `true`，否則返回 `false`。
## 參考解法
```cpp title="C++" showLineNumbers {4}
class Solution {
public:
    bool validMountainArray(vector<int>& arr) {
        int n = arr.size();
        int i = 0;

        // 先上升階段
        while (i + 1 < n && arr[i] < arr[i + 1]) {
            i++;
        }

        // 如果沒有上升或已經到達數組尾部，則不是山形數組
        if (i == 0 || i == n - 1) {
            return false;
        }

        // 下降階段
        while (i + 1 < n && arr[i] > arr[i + 1]) {
            i++;
        }

        // 如果能走到最後，則是有效的山形數組
        return i == n - 1;
    }
};
```
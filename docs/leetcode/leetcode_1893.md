
# Leetcode-1893. Check if All the Integers in a Range Are Covered
## 題目說明
給定一個二維整數數組範圍和左右兩個整數。每個 `range[i] = [starti, endi]` 表示 `starti` 和 `endi` 之間的包含區間。

如果包含範圍 `[left, right]` 中的每個整數都被範圍中的至少一個區間覆蓋，則傳回 `true`。否則返回 `false`。

如果 `starti <= x <= endi`，則整數 `x` 被區間 `Ranges[i] = [starti, endi]` 覆蓋。
### 限制條件：
- `1 <= ranges.length <= 50`
- `1 <= starti <= endi <= 50`
- `1 <= left <= right <= 50`
## 解題思路
利用雙層迴圈來完成，首先外迴圈先針對範圍 `[left, right]` 的數字進行檢查，接著內迴圈來檢查每個區間是否覆蓋當前數字，若在範圍內則結束內迴圈接著檢查下一個數字，若是不再範圍內，則繼續截查下一個區間直到內迴圈結束，若是內迴圈結束跑完還是沒有覆蓋當前數字則回傳 `false`，反之若是外迴圈結束，則代表所有數字都被覆蓋，即返回 `true`。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool isCovered(vector<vector<int>>& ranges, int left, int right) {
        // 對於每個範圍 [left, right] 的數字進行檢查
        for (int num = left; num <= right; num++) {
            bool covered = false;
            // 檢查每個區間是否覆蓋該數字
            for (int i = 0; i < ranges.size(); i++) {
                int start = ranges[i][0];
                int end = ranges[i][1];
                if (num >= start && num <= end) {
                    covered = true;
                    break; // 當找到一個區間覆蓋該數字時，結束內層迴圈
                }
            }
            // 如果該數字未被任何區間覆蓋，則返回 false
            if (!covered) {
                return false;
            }
        }
        // 如果所有數字都被覆蓋，則返回 true
        return true;
    }
};
```
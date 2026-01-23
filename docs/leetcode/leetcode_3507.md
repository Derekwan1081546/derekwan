
# Leetcode-3507. Minimum Pair Removal to Sort Array I
## 題目說明
給定一個陣列 `nums`，您可以執行下列操作任意次數：

選擇 `nums` 中和最小的相鄰元素對。如果存在多個這樣的元素對，則選擇最左邊的元素對。

將該元素對替換為它們的和。

傳回使陣列變成非遞減數組所需的最少操作次數。

如果數組中的每個元素都大於或等於其前一個元素（如果存在），則稱該數組為非遞減數組。

### 限制條件：
- `1 <= nums.length <= 50`
- `-1000 <= nums[i] <= 1000`

## 解題思路
對每個 nums[i]，要找最小的 x 使得
x | (x + 1) = nums[i]。

觀察可知，x + 1 會將 x 最右邊連續的 1 變成 0 並進位，因此
x | (x + 1) 的結果一定是「從某一位開始，右邊全部為 1」。

做法是從最低位開始檢查 nums[i] 的 bit，找到第一個為 0 的位置，
將該位右邊的所有 bit 視為連續的 1，把其中一個 1 移除即可得到最小的 x。

若 nums[i] = 2，則不可能有解，直接回傳 -1。

- 時間複雜度

    每個數字最多檢查其二進位長度（約 log nums[i]）

- 總時間複雜度：
    O(n · log M)（M 為 nums 中的最大值）

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool isSorted(vector<int>& nums) {
        for (int i = 0; i < nums.size() - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                return false;
            }
        }
        return true;
    }
    int minPair(vector<int> v) {
        int minSum = 1e9;
        int pos = -1;
        for (int i = 0; i < v.size() - 1; i++) {
            if (v[i] + v[i + 1] < minSum) {
                minSum = v[i] + v[i + 1];
                pos = i;
            }
        }
        return pos;
    }
    void mergePair(vector<int>& v, int pos) {
        v[pos] += v[pos + 1];
        v.erase(v.begin() + pos + 1);
    }
    int minimumPairRemoval(vector<int>& nums) {
        int operation = 0;
        while (!isSorted(nums)) {
            mergePair(nums, minPair(nums));
            operation += 1;
        }
        return operation;
    }
};
```

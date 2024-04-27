
# Leetcode-128. Longest Consecutive Sequence
## 題目說明
給定一個未排序的整數陣列 `nums`，傳回最長連續元素序列的長度。

您必須編寫一個在 `O(n)` 時間內運行的演算法。
### 限制條件：
- `0 <= nums.length <= 10^5`
- `-10^9 <= 數字[i] <= 10^9`

## 解題思路
1.第一個方法使用了 `unordered_set` 來存儲數組中的所有元素，這樣可以快速地檢查一個元素是否存在於集合中。接著判斷如果前一個元素不再 `set` 當中，就將此元素當作起始點做連續搜尋直到沒有連續為止，並將目前連續的長度更新成最大值即完成。

2.第二個方法使用了 `unordered_map` 格式為 `<int, bool>` 用來儲存每個元素最近一次出現的索引。若是出現則將此元素設為 `true`，接著判斷哪一個元素為起頭，若是此元素的前一個元素在 `map` 中，則代表此元素不是最長連續的頭，因此將此元素設為 `flase` ，以減少執行時間，最後找到最長連續的頭來當作起始點做連續搜尋直到沒有連續為止，並將目前連續的長度更新成最大值即完成。
## 參考解法
```cpp title="C++ unordered_set" showLineNumbers
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> set;
        for (int num : nums) {
            set.insert(num);
        }
        int maxlen = 0;
        for (int num : nums) {
            if (set.find(num - 1) == set.end()) {
                int currentNumber = num;
                int current = 1;
                while (set.find(currentNumber + 1) != set.end()) {
                    currentNumber++;
                    current++;
                }
                maxlen = max(maxlen, current);
            }
        }
        return maxlen;
    }
};
```
```cpp title="C++ unordered_map" showLineNumbers
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_map<int, bool> map;
        for (int i = 0; i < nums.size(); i++) {
            map[nums[i]] = true;
        }
        //用來標記 map 中特定條件的元素，當某個元素的前一個數字已存在於 map中時，將當前數字對應的值設置為 false。 
        for (int i = 0; i <nums.size(); i++) {
            if (map.count(nums[i] - 1) > 0) {
                map[nums[i]] = false;
            }
        }
        int maxlen = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (map[nums[i]] == true) {
                int j = 0;
                int count = 0;
                while (map.count(nums[i] + j) > 0) {
                    j++;
                    count++;
                }
                maxlen = max(maxlen, count);
            }
        }
        return maxlen;
    }
};
```

# Leetcode-45. Jump Game II
## 題目說明
給定一個陣列時間，其中 `time[i]` 表示第 `i` 輛巴士完成一次行程所需的時間。

給定一個 0 索引的長度為 n 的整數 nums 陣列。 您最初位於 nums[0]。

每個元素 nums[i] 表示從索引 i 向前跳躍的最大長度。 換句話說，如果您位於 nums[i]，則可以跳到任意 nums[i + j]，其中：

- `0 <= j <= nums[i]` 
- `i + j < n`
返回到達 nums[n - 1] 的最小跳躍次數。 產生的測試案例可以達到 nums[n - 1]。
### 限制條件：
- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 1000`
- `保證你能達到nums[n - 1]`
## 解題思路
使用了貪心策略(`greedy strategy`)。 在遍歷數組過程中，不斷更新目前能夠到達的最遠位置 `maxReach` 和下一步能夠到達的最遠位置 `nextMaxReach`。 當遍歷到達 `maxReach` 時，意味著需要再跳一次才能到達更遠的位置，此時 `count` 加一，並更新 `maxReach` 為 `nextMaxReach`。 最終回傳的 `count` 即為最少的跳躍次數。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int jump(vector<int>& nums) {
        int count = 0;
        int maxReach = 0;
        int nextMaxReach = 0;
        if (nums.size() == 1) {
            return count;
        }
        //greedy strategy
        for (int i = 0; i < nums.size(); i++) {
            if (i > maxReach) {
                maxReach = nextMaxReach;
                count++;
            }
            nextMaxReach = max(nextMaxReach, i + nums[i]);
        }
        return count;
    }
};
```
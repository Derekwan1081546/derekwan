
# Leetcode-55. Jump Game
## 題目說明
給定一個整數數組 `nums`。 您最初位於數組的第一個索引處，數組中的每個元素代表您在該位置的最大跳躍長度。

如果可以到達最後一個索引，則傳回 `true`，否則傳回 `false`。
### 限制條件：
- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^5`
## 解題思路
使用了貪心策略(`greedy strategy`)。 在遍歷數組過程中，不斷更新目前能夠到達的最遠位置，更新 `index`，將其設置為 `index` 和 `i + nums[i]` 中的較大值，這表示在目前位置能夠到達的最遠位置。 如果 如果已經可以到達最後一個位置，直接返回 true。
如果迴圈結束後仍然沒有返回 true，則返回 false，表示無法到達最後一個位置。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int index = 0;
        int i = 0;
        if (nums.size() == 1) {
            return true;
        }
        for (; i < nums.size(); i++) {
            if (i > index) { // 目前位置超出了能到達的最遠位置
                break;
            }
            index = max(index, i + nums[i]); // 更新能夠到達的最遠位置
            if (index >= nums.size() - 1) { // 如果已經可以到達最後一個位置
                return true;
            }
        }
        return false; // 無法到達最後一個位置
    }
};
```
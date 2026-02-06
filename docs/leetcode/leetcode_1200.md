
# Leetcode-1200. Minimum Absolute Difference
## 題目說明
給定一個包含不同整數的陣列 `arr`，找出所有滿足任兩個元素絕對差最小的元素對。

傳回一個按升序排列的元素對列表（相對於數組 `arr` 而言），每個元素對 `[a, b]` 滿足以下條件：

- `a, b` 來自陣列 `arr`

- `a < b`

- `b - a` 等於陣列 `arr` 中任兩個元素絕對差的最小值

### 限制條件：
- `1 <= nums.length <= 4 * 10＾4`。
- `1 <= nums[i] <= 10＾4`。

## 解題思路
本題要找出陣列中所有數值差的絕對值等於最小差值的數對。若直接比較所有可能的數對，時間複雜度會是平方等級，因此需要更有效率的做法。

解題的關鍵在於先將整個陣列進行排序。排序後，數值彼此的距離會依大小排列，此時任意兩個數的最小絕對差值，一定會出現在排序後相鄰的兩個元素之間，而不可能出現在距離較遠的元素中。原因是若中間還存在其他數字，則這兩個數的差值必然大於或等於其中某一對相鄰元素的差值。

在排序完成後，從陣列的第一個元素開始，依序比較每一組相鄰的兩個數，計算它們的差值。若目前計算到的差值小於已記錄的最小差值，則更新最小差值，並清空先前的結果，將目前這一組數對加入答案中；若差值等於目前的最小差值，則代表又找到一組符合條件的數對，直接加入結果即可。當所有相鄰元素都檢查完畢後，所收集到的數對即為答案。

此演算法的時間複雜度主要來自排序，為 `O(n log n)`，排序完成後的線性掃描為 `O(n)`，因此整體時間複雜度為 `O(n log n)`。空間複雜度方面，除了輸出結果所需的空間外，只使用固定數量的變數，為 `O(1)`。


## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<vector<int>> minimumAbsDifference(vector<int>& arr) {
        vector<vector<int>> ans;
        sort(arr.begin(), arr.end());
        int mindiff = INT_MAX;
        for (int i = 0; i < arr.size() - 1; i++) {
            if (abs(arr[i] - arr[i + 1]) < mindiff) {
                mindiff = abs(arr[i] - arr[i + 1]);
                ans.clear();
                ans.push_back({arr[i], arr[i + 1]});
            } else if (abs(arr[i] - arr[i + 1]) == mindiff) {
                ans.push_back({arr[i], arr[i + 1]});
            }
        }
        return ans;
    }
};
```
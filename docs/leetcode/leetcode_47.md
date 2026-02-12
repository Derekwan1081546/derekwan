
# Leetcode-47. Permutations II
## 題目說明
給定一組可能包含重複數字的數字 `nums`，傳回所有可能的唯一排列，順序不限。

### 限制條件：
- `1 <= nums.length <= 8`。

- `-10 <= nums[i] <= 10`。

## 解題思路

這題是 **回溯法 (Backtracking)** 的經典應用，專門解決 **含有重複數字的全排列 (Permutations II)** 問題。
與沒有重複數字的全排列不同，這裡的核心難點在於 **如何去除重複的排列結果**（例如輸入 `[1, 1, 2]`，不應該產生兩個 `[1, 1, 2]`）。



我們可以透過 **排序 (Sorting)** 加上 **剪枝 (Pruning)** 來解決：

1.  **前置處理：排序 (Sorting)**
    * 首先對陣列進行排序 (`sort`)。這一步至關重要，因為它將相同的數字排在一起，方便我們在後續遍歷時判斷是否遇到重複元素。

2.  **回溯搜索 (Backtracking)**
    * 使用 `path` 記錄當前的排列路徑。
    * 使用 `used` 陣列記錄哪些元素已經被選入當前路徑。
    * 遞迴終止條件：當 `path` 的長度等於 `nums` 的長度時，代表找到一組完整排列。

3.  **關鍵剪枝邏輯 (Pruning Strategy)**
    在 `for` 迴圈中，我們合併了兩個跳過條件：
    `if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]))`

    * **條件一：基本去重 (`used[i]`)**
        * 如果當前元素 `nums[i]` 已經在目前的 `path` 中被使用了，當然要跳過（這是全排列的基本規則，同一個位置的元素不能重複使用）。

    * **條件二：樹層去重 (`i > 0 && nums[i] == nums[i - 1] && !used[i - 1]`)**
        * **這是本題最核心的邏輯**。
        * **`i > 0 && nums[i] == nums[i - 1]`**：表示當前數字與前一個數字相同。
        * **`!used[i - 1]`**：表示前一個相同的數字 **「當前沒有被使用」**。這意味著前一個數字的遞迴分支剛剛結束（回溯回來了），現在我們又要用一個一模一樣的數字作為當前層級的開頭。這會導致完全一樣的子樹，因此必須跳過。
        * *簡單來說：對於重複的數字，我們規定只使用「第一個」還沒被用過的來開啟分支。*

---

### 複雜度分析

* **時間複雜度：$O(N \times N!)$**
    * 全排列的總數最大為 $N!$。
    * 每次將結果加入 `res` 需要 $O(N)$ 的複製時間。
    * 儘管有剪枝，但在最壞情況下（無重複元素），複雜度仍接近 $O(N \times N!)$。

* **空間複雜度：$O(N)$**
    * 遞迴堆疊 (Recursion Stack) 的深度為 $N$。
    * `used` 陣列和 `path` 陣列皆佔用 $O(N)$ 空間。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    void backtrack(vector<int>& nums, vector<bool>& used, vector<int>& path,
                   vector<vector<int>>& res) {
        if (path.size() == nums.size()) {
            res.push_back(path);
            return;
        }

        for (int i = 0; i < nums.size(); ++i) {
            // 剪枝條件：
            // 1. 如果該元素已被使用，跳過
            // 2.
            // 如果當前元素與前一個元素相同，且前一個元素尚未被使用（說明剛回溯完），跳過以去重
            if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) {
                continue;
            }

            used[i] = true;
            path.push_back(nums[i]);

            backtrack(nums, used, path, res);

            // 回溯
            path.pop_back();
            used[i] = false;
        }
    }

    vector<vector<int>> permuteUnique(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        vector<bool> used(nums.size(), false);
        // 必須先排序，去重邏輯才能生效
        sort(nums.begin(), nums.end());
        backtrack(nums, used, path, res);
        return res;
    }
};
```
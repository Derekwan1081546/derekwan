
# Leetcode-380. Insert Delete GetRandom O(1)
## 題目說明
實作 `RandomizedSet` 類別：

- `RandomizedSet()` 初始化 `RandomizedSet` 物件。
- `bool insert(int val)` 如果項目 `val` 不存在，則將其插入集合中。如果該項不存在則傳回 `true`，否則傳回 `false`。
- `bool remove(int val)` 從集合中刪除項目 `val`（如果存在）。如果該項目存在則傳回 `true`，否則傳回 `false`。
- `int getRandom()` 從目前元素集中傳回一個隨機元素（呼叫此方法時保證至少存在一個元素）。每個元素必須具有相同的返回機率。
您必須實作類別的函數，以便每個函數的平均時間複雜度為 `O(1)`。
### 限制條件：
- `-2^31 <= val <= 2^31 - 1`
- 最多將呼叫 `2 * 10^5` 次來 `insert`、`delete`和 `getRandom`。
- 當呼叫 `getRandom` 時，資料結構中至少會有一個元素。

## 解題思路
1. 使用`unordered_map`和`vector`:分別用來儲存`insert`過後的元素和元素的位置，當此元素新增過後，若是再次新增則會去從`map`中檢查此元素是否已存在，接著才能判斷是否需要`insert`，移除元素時則需要先將需移除的元素與最後一個元素交換位置，才能刪除同時將最後一位的元素位置更新為原本要移除元素的位置，最後隨機元素則是從`vector`中去隨機選擇任一個元素然後回傳。

2. 使用`unordered_set`: `unordered_set`比起`map`和`vector`來說可以不用去管元素位置，即可以新增刪除，前提還是需要先檢查要新增或刪除的元素是否已存在，
## 參考解法
```cpp title="C++ unordered_map、vector" showLineNumbers
class RandomizedSet {
    vector<int> v;
    unordered_map<int, int> mp;

public:
    RandomizedSet() {}
    bool search(int val) { return mp.find(val) != mp.end(); }
    bool insert(int val) {
        if (search(val)) {
            return false;
        }
        v.push_back(val);
        mp[val] = v.size() - 1;
        return true;
    }

    bool remove(int val) {
        if (search(val)) {
            // 把要移除的元素與最後一個元素交換
            int lastElement = v.back();
            int idxToReplace = mp[val];
            v[idxToReplace] = lastElement;
            mp[lastElement] = idxToReplace;
            // 移除最後一個元素
            v.pop_back();
            mp.erase(val);
            return true;
        }
        return false;
    }

    int getRandom() { return v[rand() % v.size()]; }
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * RandomizedSet* obj = new RandomizedSet();
 * bool param_1 = obj->insert(val);
 * bool param_2 = obj->remove(val);
 * int param_3 = obj->getRandom();
 */
```
```cpp title="C++ unordered_set" showLineNumbers
class RandomizedSet {
    unordered_set<int>s;
public:
    RandomizedSet() {}
    
    bool insert(int val) {
        if(s.find(val)!=s.end())return 0;
        else {
           s.insert(val);
            return 1;
        }
    }
    
    bool remove(int val) {
        if(s.find(val)==s.end())return 0;
        else {
            s.erase(val);
            return 1;
        }
    }
    
    int getRandom() {
        return *next(s.begin(),rand()%s.size()); 
    }
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * RandomizedSet* obj = new RandomizedSet();
 * bool param_1 = obj->insert(val);
 * bool param_2 = obj->remove(val);
 * int param_3 = obj->getRandom();
 */
```
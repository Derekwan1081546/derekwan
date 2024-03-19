---
sidebar_position: 2
---
# uva2

```cpp title="uva2.cpp" showLineNumbers
#include<iostream>
using namespace std;
int main()
{
	int a=0,sum=0;
	while (cin>>a)
	{
		if(a>=1)
		{
			for(;a>=1;a--)
			{
				sum+=a*a;
			}
			cout <<sum<<endl;
			sum=0;
		}
		else
		{
			cout <<"error.";
		}
		
	}
}
```
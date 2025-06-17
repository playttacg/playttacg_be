#include<bits/stdc++.h>
using namespace std;
int main(){
    int n,x;
    cin>>n>>x;
    int mat1[n][n];
    int mat2[n][n];
    for(int i = 0;i<n;i++){
        for(int j =0;j<m;j++){
            cin>>mat1[i][j];
        }
    }
    for(int i = 0;i<n;i++){
        for(int j =0;j<m;j++){
            cin>>mat2[i][j];
        }
    }

    int matOneRow = 0;
    int matOneCol = 0;
    int matTwoRow = n-1;
    int matTwoCol = n-1;
    int count = 0;
    while(matOneRow <= matTwoRow && matOneCol <= matTwoCol){
        int sum = mat1[matOneRow][matOneCol] + mat2[matTwoRow][matTwoCol];
        if(sum == x){
            count++:
        }
        else if(sum > x){
            
        }

    }
    
}
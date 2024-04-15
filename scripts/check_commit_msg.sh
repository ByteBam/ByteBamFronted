#!/bin/sh

# 获取两个参数：起始SHA和结束SHA
start_sha=$1
end_sha=$2

# 设置颜色变量
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 定义提交信息规范函数
check_commit_message() {
    MSG=`awk '{printf("%s",\$0)}' \$1`
    if [[ "$MSG" =~ ^(Feature|BugFix|UnitTest|Docs|Style|Refactor|Chore|CI|Build|Revert)\(.*\):.*\$ ]]; then
        echo -e "\033[32m 🚀commit check success!!! \033[0m\n"
    else
        echo -e "\033[31m Error: the commit message is irregular \033[m"
        echo -e "\033[33m Warning: type must be one of [Feature|BugFix|UnitTest|Docs|Style|Refactor|Chore|CI|Build|Revert]\033[0m"
        echo -e "\033[33m example: feat(issueId): add the user login \033[m"
        exit 1
    fi
}

# 遍历从start_sha到end_sha的所有提交
for sha in $(git rev-list $start_sha..$end_sha); do
    commit_msg=$(git show --format=%B -s $sha)
    check_commit_message "$commit_msg"
done

echo -e "${BLUE}Commit message check passed.${NC}\n"

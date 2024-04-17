#!/bin/bash
MSG=`awk '{printf("%s",$0)}' $1`
    echo -e "\033[32m start verify commit-msg..."

if [[ $MSG =~ ^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)\(.*\):.*$ ]]
then
	echo -e "\033[32m 🚀commit check success!!! \033[0m\n"
else
    echo -e "\033[31m Error: the commit message is irregular \033[m"
    echo -e "\033[33m Warning: type must be one of [Feature|BugFix|UnitTest|Docs|Style|Refactor|Chore|CI|Build|Revert]\033[0m"
    echo -e "\033[33m example: feat(issueId): add the user login \033[m"
	exit 1
fi

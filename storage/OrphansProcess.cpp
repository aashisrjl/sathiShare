#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main() {
    pid_t pid = fork();

    if (pid < 0) {
        perror("Failed to create orphan process");
        exit(1);
    } else if (pid == 0) {
        // Child process
        sleep(2); // Wait for the parent to exit
        printf("Orphan process (PID: %d, New Parent PID: %d)\n", getpid(), getppid());
    } else {
        // Parent process
        printf("Parent process (PID: %d) exiting, leaving child as orphan.\n", getpid());
        exit(0); // Parent exits immediately
    }

    return 0;
}


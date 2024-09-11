#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main() {
    pid_t pid = fork();

    if (pid < 0) {
        perror("Failed to create child process");
        exit(1);
    } else if (pid == 0) {
        // Child process
        printf("Child process (PID: %d, Parent PID: %d)\n", getpid(), getppid());
    } else {
        // Parent process
        printf("Parent process (PID: %d, Child PID: %d)\n", getpid(), pid);
        wait(NULL); // Wait for child to complete
    }

    return 0;
}


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
        printf("Child process running (PID: %d, Parent PID: %d)\n", getpid(), getppid());
        sleep(2); // Simulate some work
        printf("Child process (PID: %d) exiting.\n", getpid());
    } else {
        // Parent process
        printf("Parent process (PID: %d) waiting for child to complete.\n", getpid());
        wait(NULL); // Wait for child to complete
        printf("Parent process (PID: %d) exiting.\n", getpid());
    }

    return 0;
}


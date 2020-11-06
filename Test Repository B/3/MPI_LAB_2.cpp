#include <stdio.h>
#include <iostream>
#include "mpi.h"
#include <ctime>

int getNextProcess(int oldProcess, int countProcess) {
	while (true){
		int nextProcess = rand() % countProcess;
		if (nextProcess != oldProcess){
			return nextProcess;
		}
	}
}

void printMsg(int oldProcess, int newProcess, int length){
	printf("\nProcess %3d sent msg to process %3d, length %3d",oldProcess,newProcess,length);
	fflush(stdout);
}

int main(int argc, char* argv[])
{
	srand(time(0));

	int ProcNum, ProcRank, RecvRank, endCode = -1;
	bool isOver = false;
	MPI_Status Status;

	int length = 10;

	MPI_Init(&argc, &argv);
	MPI_Comm_size(MPI_COMM_WORLD, &ProcNum);
	MPI_Comm_rank(MPI_COMM_WORLD, &ProcRank);


	if (ProcRank == 0){
		int nextProccess = getNextProcess(ProcRank, ProcNum);
		printMsg(ProcRank,nextProccess,length);
		MPI_Send(&length, 1, MPI_INT, nextProccess, ProcRank, MPI_COMM_WORLD);
	}

	
	while (true) {
		MPI_Recv(&RecvRank, 1, MPI_INT, MPI_ANY_SOURCE, MPI_ANY_TAG, MPI_COMM_WORLD, &Status);
		
		length = RecvRank;

		if (RecvRank == -1) {
			//std::cout << "die" << ProcRank;
			break;
		}

		//printf("\nProcess 0 sent msg to process %3d", length);
		//fflush(stdout);
		if (length == 0){
			//std::cout << "hello from " << ProcRank;
			for (size_t i = 0; i < ProcNum; i++)
			{
				if (i != ProcRank) {
					MPI_Send(&endCode, 1, MPI_INT, i, ProcRank, MPI_COMM_WORLD);
				}
			}
			break;
		}else{
			length--;
			int nextProccess = getNextProcess(ProcRank, ProcNum);
			printMsg(ProcRank, nextProccess, length);
			MPI_Send(&length, 1, MPI_INT, nextProccess, ProcRank, MPI_COMM_WORLD);
		}
		
	}
	
	
	MPI_Finalize();
	return 0;
}

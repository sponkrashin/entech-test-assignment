var matrixLine = Console.ReadLine();
var matrixRows = matrixLine?.Split(';');

// All rows of the matrix should have same size (number of columns)
if (matrixRows == null || matrixRows.Any(x => x.Length != matrixRows[0].Length))
{
    Console.WriteLine("Wrong input format");
    return;
}

var matrix = matrixRows
    .Select(row => row
        .Split(',')
        .ToArray())
    .ToArray();

Console.WriteLine(Calculate());
return;

int Calculate()
{
    var result = 0;

    var rowsCount = matrix.Length;
    var columnsCount = matrix[0].Length;

    for (var i = 0; i < columnsCount; ++i)
    {
        for (var j = 0; j < rowsCount; ++j)
        {
            // If current element in matrix is 1, but it has left or top neighbor which is also 1,
            // then it is a part of already counted area, and we don't need to count it again
            if (matrix[j][i] == "1" && !CheckNeighbors(i, j))
            {
                ++result;
            }
        }
    }

    return result;

    // Function checks if there is a top or left element in matrix which is also 1
    bool CheckNeighbors(int column, int row)
    {
        if (column > 0 && matrix[row][column - 1] == "1")
        {
            return true;
        }

        if (row > 0 && matrix[row - 1][column] == "1")
        {
            return true;
        }

        return false;
    }
}

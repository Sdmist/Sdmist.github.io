program BeautifulMatrix
  implicit none
  integer :: matrix(5, 5)
  integer :: pos(2) 
  
  read *, matrix
  pos = findloc(matrix, 1)
  
  write(*, '(I0)') abs(3-pos(1)) + abs(3-pos(2))
  
end program BeautifulMatrix
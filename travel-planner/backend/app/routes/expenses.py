from fastapi import APIRouter

router = APIRouter()

@router.delete("/{expense_id}")
def delete_expense(expense_id: int):
    return {"msg": "delete_expense"}

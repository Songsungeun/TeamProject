package honey.vo;

public class JsonResult {
	public static final String SUCCESS = "success";
	public static final String SUCCESS2 = "success2";
	public static final String SUCCESS3 = "success3";
	public static final String FAIL = "fail";
	public static final String ERROR = "error";

	String state;
	Object data;
	Object data2;

	public static JsonResult success() {
		return new JsonResult(SUCCESS);
	}

	public static JsonResult success(Object data) {
		return new JsonResult(SUCCESS, data);
	}

	public static JsonResult success(Object data1, Object data2) {
		return new JsonResult(SUCCESS, data1, data2);
	}

	public static JsonResult success2(Object data) {
		return new JsonResult(SUCCESS2, data);
	}
	
	public static JsonResult success3(Object data) {
		return new JsonResult(SUCCESS3, data);
	}


	public static JsonResult fail() {
		return new JsonResult(FAIL);
	}

	public static JsonResult fail(Object data) {
		return new JsonResult(FAIL, data);
	}

	public static JsonResult fail(Object data, Object data2) {
		return new JsonResult(FAIL, data, data2);
	}






	public static JsonResult error() {
		return new JsonResult(ERROR);
	}

	public static JsonResult error(Object data) {
		return new JsonResult(ERROR, data);
	}

	public JsonResult(String state) {
		this(state, null);
	}

	public JsonResult(String state, Object data) {
		this.state = state;
		this.data = data;
	}

	public JsonResult(String success2, Object data1, Object data2) {
		// TODO Auto-generated constructor stub
	}

	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}

	public Object getData2() {
		return data2;
	}

	public void setData2(Object data2) {
		this.data2 = data2;
	}



}

package honey.controller.json;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
 
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
 
import org.apache.commons.codec.binary.Base64;
 
public class AES256Util {
 
  private String REAL_KEY = "KEY";
 
  private String iv;
  private Key keySpec;
 
  private String SHA256(String key) {
    String SHA = "";
    try {
      MessageDigest sh = MessageDigest.getInstance("SHA-256");
      sh.update(key.getBytes());
      byte byteData[] = sh.digest();
      StringBuffer sb = new StringBuffer();
      for (int i = 0; i < byteData.length; i++) {
        sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
      }
      SHA = sb.toString();
 
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
      SHA = null;
    }
    return SHA;
  }
 
  public AES256Util() throws UnsupportedEncodingException {
    String key = SHA256(REAL_KEY);
    this.iv = key.substring(0, 16);
 
    byte[] keyBytes = new byte[16];
    byte[] b = key.getBytes("UTF-8");
    int len = b.length;
    if (len > keyBytes.length)
      len = keyBytes.length;
    System.arraycopy(b, 0, keyBytes, 0, len);
    SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
 
    this.keySpec = keySpec;
  }
 
  // 암호화
  public String aesEncode(String str) throws java.io.UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException,
      InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
     
     
    Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
    c.init(Cipher.ENCRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes()));
 
    byte[] encrypted = c.doFinal(str.getBytes("UTF-8"));
    String enStr = new String(Base64.encodeBase64(encrypted));
     
    return enStr;
  }
 
  // 복호화
  public String aesDecode(String str) throws java.io.UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException,
      InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
     
    Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
    c.init(Cipher.DECRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes("UTF-8")));
    byte[] byteStr = Base64.decodeBase64(str.getBytes());
 
    return new String(c.doFinal(byteStr), "UTF-8");
  }
 
}